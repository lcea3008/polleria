const markdownpdf = require("markdown-pdf");
const fs = require("fs");

const options = {
  paperFormat: "A4",
  paperOrientation: "portrait",
  paperBorder: {
    top: "1cm",
    right: "1cm",
    bottom: "1cm",
    left: "1cm"
  },
  renderDelay: 1000,
  cssPath: "pdf-styles.css"
};

markdownpdf(options)
  .from("PROPUESTA_BODEGA_ARTESANAL.md")
  .to("PROPUESTA_BODEGA_ARTESANAL.pdf", function() {
    console.log("✅ PDF generado exitosamente: PROPUESTA_BODEGA_ARTESANAL.pdf");
  });
