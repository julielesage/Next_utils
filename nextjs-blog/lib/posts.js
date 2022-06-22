import fs from 'fs';
import path from 'path';
// install gray-matter which lets us parse the metadata in each markdown file.
import matter from 'gray-matter';
// To render markdown content
import remark from 'remark';
import html from 'remark-html';

// process.cwd() = le directory dans lequel on run "node" = nextjs-blog ici
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames.map(fileName => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '')

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName)
		const fileContents = fs.readFileSync(fullPath, 'utf8')

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents)

		// Combine the data with the id
		return {
			id,
			...matterResult.data
		}

		//////////
		//OR////////
		//const res = await fetch('..') (= axios.get)
		//return res.json()
		///////////
	})
	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1
		} else {
			return -1
		}
	})
};

export function getAllPostsIds() {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map(fileName => {
		return {
			params: { // params key is important for getStaticPaths
				id: fileName.replace(/\.md$/, '') // id corresponding to [id]
			}
		}
	})
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf-8');
	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML strings = le contenu de chaque post
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);

	const contentHtml = processedContent.toString()

	// Combine the data with the id
	return {
		id,
		contentHtml,
		...matterResult.data
	}
}