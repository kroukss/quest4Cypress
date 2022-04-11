describe("File upload and download tests", () => {
  beforeEach(() => {
    cy.visit("https://filebin.net/");
  });

  it("Upload file and download it in Zip format", () => {
    cy.get("#fileField").attachFile("srv.jpg");
    cy.contains("it expires 6 days from now").should("be.visible");
    cy.get('[data-bs-target="#modalArchive"]').click();
    cy.contains("Zip")
      .invoke("attr", "href")
      .then((downloadLink) => {
        cy.log(downloadLink);
        cy.downloadFile(
          "https://filebin.net" + downloadLink,
          "mydownloads/zipFiles",
          "downloadedFromCypress.zip"
        );
        cy.readFile("mydownloads/zipFiles/downloadedFromCypress.zip");
      });
  });
});
