const { OpenSearch } = require("@aws-sdk/client-opensearch");
const { PutDocumentCommand } = require("@aws-sdk/client-opensearch");

exports.handler = async (event) => {
const openSearchClient = new OpenSearch({
  region: "us-east-1"
});

const domainEndpoint = "https://search-docmanager-j64g3atiqallxnfittl4nk2lea.us-east-1.es.amazonaws.com/";

const indexName = "userrecords";
const document = {
  id: "111",
  title: "Example Document",
  content: "This is an example document content.",
};

const putDocumentCommand = new PutDocumentCommand({
    domainName: domainEndpoint,
    indexName,
    id: document.id,
    body: document,
  });


  try {
    const response = await openSearchClient.send(putDocumentCommand);
    console.log("Document added successfully:", response);
  } catch (error) {
    console.error("Error adding document:", error);
  }

}