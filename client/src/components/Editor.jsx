/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoNgNARATAdAnDADBSBGA7AFiidqrpxQAcArOgMwggXFSmmLrHGJSojunU2JWbEUEAKYA7FIjDBUYGXNlhEAXUg4obAEboISoA==
 */

import { useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { getEnv } from "@/helpers/getEnv";
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
  BlockToolbar,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

export default function Editor({ props }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  // const [isLayoutReady, setIsLayoutReady] = useState(false);

  // useEffect(() => {
  // 	setIsLayoutReady(true);

  // 	return () => setIsLayoutReady(false);
  // }, []);

  const editorConfig = useMemo(() => {
    return {
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "showBlocks",
          "|",
          "bulletedList",
          "numberedList",
        ],
        shouldNotGroupWhenFull: false,
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
        TextTransformation,
      ],

      balloonToolbar: ["bulletedList", "numberedList"],

      blockToolbar: ["bulletedList", "numberedList"],

      fullscreen: {
        onEnterCallback: (container) =>
          container.classList.add(
            "editor-container",
            "editor-container_classic-editor",
            "editor-container_include-block-toolbar",
            "editor-container_include-fullscreen",
            "main-container",
          ),
      },

      initialData: props.initialData || "",

      licenseKey: `${getEnv("VITE_LICENSE_KEY")}`,

      mention: {
        feeds: [
          {
            marker: "@",
            feed: [],
          },
        ],
      },

      menuBar: {
        isVisible: true,
      },

      placeholder: "Type or paste your content here!",
    };
  }, [props.initialData]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-fullscreen"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                onChange={props.onChange}
                editor={ClassicEditor}
                config={editorConfig}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
