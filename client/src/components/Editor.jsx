/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoNgNARATAdAnDADBSBGA7AFiidqrpxQAcArOgMwggXFSmmLrHGJSojunU2JWbEUEAKYA7FIjDBUYGXNlhEAXUg4obAEboISoA==
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	Autoformat,
	Emoji,
	Fullscreen,
	HtmlComment,
	List,
	Markdown,
	MediaEmbed,
	Mention,
	PasteFromMarkdownExperimental,
	ShowBlocks,
	TextTransformation,
	BalloonToolbar,
	BlockToolbar
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';



const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjczOTgzOTksImp0aSI6ImEwODNhZjIwLTdjYjYtNGU0Ni1iOTZmLWNjZmExMDRmN2UwOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImFmY2UzOWRkIn0.PYjzLK37tfpVVy4RqO6A0f_n6GQs5zw3xwsjcqxCl5oP4DzhgJZOd8DU-zBD5fYprLgqL8IV5dWaoyncmK7nCA';

export default function Editor({props}) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		return {
			editorConfig: {
				toolbar: {
					items: ['undo', 'redo', '|', 'showBlocks', '|', 'bulletedList', 'numberedList'],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Autoformat,
					Autosave,
					BalloonToolbar,
					BlockToolbar,
					Emoji,
					Essentials,
					Fullscreen,
					HtmlComment,
					List,
					Markdown,
					MediaEmbed,
					Mention,
					Paragraph,
					PasteFromMarkdownExperimental,
					ShowBlocks,
					TextTransformation
				],
				balloonToolbar: ['bulletedList', 'numberedList'],
				blockToolbar: ['bulletedList', 'numberedList'],
				fullscreen: {
					onEnterCallback: container =>
						container.classList.add(
							'editor-container',
							'editor-container_classic-editor',
							'editor-container_include-block-toolbar',
							'editor-container_include-fullscreen',
							'main-container'
						)
				},
				initialData:props.initialData || '',
				licenseKey: LICENSE_KEY,
				mention: {
					feeds: [
						{
							marker: '@',
							feed: [
								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
							]
						}
					]
				},
				menuBar: {
					isVisible: true
				},
				placeholder: 'Type or paste your content here!'
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div
				className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-fullscreen"
				ref={editorContainerRef}
			>
				<div className="editor-container__editor">
					<div ref={editorRef}>{editorConfig && <CKEditor onChange={props.onChange} editor={ClassicEditor} config={editorConfig} />}</div>
				</div>
			</div>
		</div>
	);
}
