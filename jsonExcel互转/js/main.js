FileReader.prototype.readAsBinaryString = function (fileData) {
	var binary = "";
	var pt = this;
	var reader = new FileReader();
	reader.onload = function (e) {
		var bytes = new Uint8Array(reader.result);
		var length = bytes.byteLength;
		for (var i = 0; i < length; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		pt.content = binary;
		pt.onload(pt); //页面内data取pt.content文件内容
	}
	reader.readAsArrayBuffer(fileData);
}

function UploadFile() {
	var selectedFile = document.getElementById('fileUploader').files[0];
	if (selectedFile == undefined) {
		alert("请先上传文件！");
		return;
	}
	var reader = new FileReader();
	reader.onload = function (event) {
		var data = event.target.result;
		var workbook = XLSX.read(data, {
			type: 'binary'
		});
		var zip = new JSZip();
		var downloadState = true;
		var zipName = "";
		workbook.SheetNames.forEach(function (sheetName) {
			if (sheetName == "languagePage") {
				var zipNameSheet = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				zipName = getFoldName(zipNameSheet[0]);
			} else {
				var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				if (XL_row_object[0]) {
					if (parseJson(XL_row_object[0], sheetName)) {
						var content = JSON.stringify(XL_row_object[0]);
						zip.folder(zipName).file(sheetName + '.json', content)
					} else {
						downloadState = false;
					}
				} else {
					downloadState = false;
					alert(sheetName + "文件为空！");
				}
			}
		});
		if (downloadState) {
			zip.generateAsync({
					type: "blob"
				})
				.then(function (content) {
					saveAs(content, zipName + ".zip");
				});
		}
	};
	reader.onerror = function (event) {
		console.error("File could not be read! Code " + event.target.error.code);
	};
	// reader.readAsBinaryString(selectedFile);
	reader.readAsArrayBuffer(selectedFile);
}
// 获取文件名
function getFoldName(param) {
	var jsonObj = JSON.stringify(param);
	var obj = new Function("return" + jsonObj)(); //转换后的JSON对象
	return obj.language;
}
// 遍历解析Json
function parseJson(jsonObj, jsonName) {
	var rightOrFalse;
	for (var key in jsonObj) {
		if (key.indexOf('__EMPTY') == 0) {
			alert('页卡' + jsonName + 'key值缺失，请检查');
			rightOrFalse = false;
			break;
		} else {
			rightOrFalse = true;
		}
		// if (!jsonObj[key]) {
		// 	alert('页卡' + jsonName + 'value值缺失，请检查');
		// 	return false;
		// }
	}
	return rightOrFalse;
	// 
	// exportJSON(jsonObj,jsonName);
}
// 导出JSON 
function exportJSON(jsonObj, jsonName) {
	console.log(jsonObj)
	var content = JSON.stringify(jsonObj);
	var blob = new Blob([content], {
		type: "text/plain;charset=utf-8"
	});
	saveAs(blob, jsonName + ".json");
}
// Excel转JSON
function dataToExcel() {
	var selectedFile = document.getElementById('JSONUploader').files[0];
	var filename = selectedFile.name.split('.')[0];
	var wopts = {
		bookType: 'xlsx',
		bookSST: false,
		type: 'binary'
	}; //这里的数据是用来定义导出的格式类型
	var wb = {
		SheetNames: [filename],
		Sheets: {},
		Props: {}
	};
	var reader = new FileReader();
	reader.readAsText(selectedFile, "UTF-8"); //读取文件
	reader.onload = function (event) {
		var data = new Array();
		data.push(JSON.parse(event.target.result));
		wb.Sheets[filename] = XLSX.utils.json_to_sheet(data);

		var str = XLSX.write(wb, wopts);
		var buffer = new ArrayBuffer(str.length);
		var view = new Uint8Array(buffer);
		for (var i = 0; i != str.length; ++i) {
			view[i] = str.charCodeAt(i) & 0xFF;
		}
		var blob = new Blob([buffer], {
			type: "application/octet-stream"
		});
		saveAs(blob, filename + ".xlsx");
	}

}