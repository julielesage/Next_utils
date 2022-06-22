// automatiquement sur la route : http://localhost:3000/api/hello !!

export default function handler(req, res) {
	const email = req.body.email;
	// Then save email to your database, etc...
	res.status(200).json({ text: "hello" });
}