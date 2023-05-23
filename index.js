const fs = require('fs');
const mjml = require('mjml');

const run = () => {
	if (!process.env.npm_config_inFile || !process.env.npm_config_outFile) {
		console.log(
			'Usage: npm run generate --inFile=example.mjml --outFile=example.html'
		);

		return;
	}

	fs.readFile(
		`./templates/${process.env.npm_config_inFile}`,
		'utf8',
		(err, buf) => {
			if (err) {
				throw err;
			}

			const { html } = mjml(buf.toString());

			fs.writeFile(
				`./templates/output/${process.env.npm_config_outFile}`,
				html,
				(err) => {
					if (err) console.error('Failed to write to file!');
					console.log('Successfully transformed MJML to HTML!');
				}
			);
		}
	);
};

run();
