function doGet(e) {
  var folderId = e.parameter.folderId;
  
  // Set CORS headers
  var output = ContentService.createTextOutput();
  
  if (!folderId) {
    output.setContent(JSON.stringify({ error: "No folderId provided" }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var result = [];
    
    while (files.hasNext()) {
      var file = files.next();
      var mimeType = file.getMimeType();
      
      result.push({
        id: file.getId(),
        name: file.getName(),
        mimeType: mimeType,
        thumbnailLink: "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1000",
        webContentLink: file.getUrl() // Keep basic URL, we handle images via thumbnail link
      });
    }
    
    output.setContent(JSON.stringify({ files: result }));
  } catch (err) {
    output.setContent(JSON.stringify({ error: err.toString() }));
  }
  
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
