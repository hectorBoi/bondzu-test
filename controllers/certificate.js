const { PDFDocument, StandardFonts } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");
const { Router } = require("express");

const fs = require("fs"),
	fsp = fs.promises;

const path = require("path");

const publicPath = path.resolve(__dirname, "public");

const htmlPath = path.join(publicPath, "assets/P-1-5.pdf");
const destinationPath = path.join(publicPath, "assets/certificate.pdf");
// Initializes the router
const router = Router();

router.post("/", async (req, res, next) => {
	try {
		const animalName = req.body.animal;
		const userName = req.body.userName;
		const document = await PDFDocument.load(await fsp.readFile(htmlPath));

		const courierBoldFont = await document.embedFont(StandardFonts.Courier);
		const firstPage = document.getPage(0);

		firstPage.moveTo(210, 560);
		firstPage.drawText(userName, {
			font: courierBoldFont,
			size: 15,
		});

		firstPage.moveTo(210, 435);
		firstPage.drawText(animalName, {
			font: courierBoldFont,
			size: 15,
		});

		firstPage.moveTo(160, 330);
		firstPage.drawText(new Date().toDateString(), {
			font: courierBoldFont,
			size: 15,
		});

		fsp.writeFile(destinationPath, await document.save(), () => {
			console.log("done");
		});
		const pdfBytes = await document.save();

		res.setHeader("Content-Type", "application/pdf");
		res.setHeader(
			"Content-Disposition",
			"attachment; filename=certificate.pdf"
		);
		res.send({"data": pdfBytes});
        
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
