// src/components/RichTextEditor/RichTextEditor.jsx
/* eslint-disable react-hooks/set-state-in-effect -- counters mirror the external Jodit editor */
import { useRef, useState, useEffect, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const RichTextEditor = ({ value, onChange, placeholder = '', maxLength = 2000, maxImageSizeInMB = 3.50 }) => {
    const editorRef = useRef(null);
    const [imageSize, setImageSize] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);

    // Add custom CSS for proper list styling and anchor tags
    // Add custom CSS for proper list styling, anchor tags, headings, code blocks, and quotes
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .jodit-wysiwyg ul {
                list-style-type: disc !important;
                margin-left: 20px !important;
                padding-left: 20px !important;
            }
            .jodit-wysiwyg ol {
                list-style-type: decimal !important;
                margin-left: 20px !important;
                padding-left: 20px !important;
            }
            .jodit-wysiwyg li {
                display: list-item !important;
                margin-bottom: 5px !important;
            }
            .jodit-wysiwyg ul li {
                list-style-type: disc !important;
            }
            .jodit-wysiwyg ol li {
                list-style-type: decimal !important;
            }
            .jodit-toolbar-button__ul .jodit-toolbar-button__trigger,
            .jodit-toolbar-button__ol .jodit-toolbar-button__trigger {
                display: none !important;
            }

            /* Anchor tags */
            .jodit-wysiwyg a {
                color: #1e40af !important;
                text-decoration: underline !important;
                cursor: pointer !important;
            }
            .jodit-wysiwyg a:hover {
                color: #1d4ed8 !important;
                text-decoration: underline !important;
            }
            .jodit-wysiwyg a:visited {
                color: #7c3aed !important;
            }

            /* Headings */
            .jodit-wysiwyg h1 { font-size: 1.875rem !important; font-weight: 700 !important; margin: 0.5em 0; }
            .jodit-wysiwyg h2 { font-size: 1.5rem !important; font-weight: 600 !important; margin: 0.5em 0; }
            .jodit-wysiwyg h3 { font-size: 1.25rem !important; font-weight: 600 !important; margin: 0.5em 0; }
            .jodit-wysiwyg h4 { font-size: 1.125rem !important; font-weight: 500 !important; margin: 0.5em 0; }

            /* Code blocks */
            .jodit-wysiwyg pre, 
            .jodit-wysiwyg code {
                color: #16a34a !important;
                background-color: #f9fafb !important;
                font-family: monospace !important;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                display: block;
                overflow-x: auto;
            }

            /* Quotes */
            .jodit-wysiwyg blockquote {
            border-left: 4px solid #9ca3af; /* darker gray */
            padding-left: 1rem;
            margin: 1rem 0;
            color: #1f2937; /* darker text */
            font-style: italic;
            background-color: #e5e7eb; /* darker gray background */
            border-radius: 0.25rem;
            }

            /* Fix dialog focus issues */
            .jodit-dialog {
                z-index: 10000 !important;
                position: fixed !important;
            }
            .jodit-dialog__overlay {
                z-index: 9999 !important;
            }
            .jodit-dialog__content {
                z-index: 10001 !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []);


    // Use useMemo to prevent re-rendering issues that cause focus loss
    const config = useMemo(() => ({
        readonly: false,
        height: 300,
        toolbar: true,
        spellcheck: true,
        language: 'en',
        toolbarButtonSize: 'small',
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: 'insert_as_text',
        // Prevent dialog focus issues
        globalFullSize: false,
        // Keep selection when clicking outside
        saveSelectionOnBlur: true,
        buttons: [
            'source', '|',
            'bold', 'italic', 'underline', 'paragraph', '|',
            'ul', 'ol', '|',
            'outdent', 'indent', '|',
            'brush', '|',
            'image', 'table', 'link', '|',
            'align', 'undo', 'redo', '|',
            'hr', 'eraser',
            'fullsize',
        ],

        // buttons: [
        //     'source', '|',
        //     'bold', 'italic', 'underline', 'strikethrough', '|',
        //     'superscript', 'subscript', '|',
        //     'ul', 'ol', '|',
        //     'outdent', 'indent', '|',
        //     'left', 'center', 'right', 'justify', '|',
        //     'font', 'fontsize', 'paragraph', '|',
        //     'brush', 'background', '|',
        //     'image', 'file', 'video', 'table', 'link', '|',
        //     'hr', 'symbols', '|',
        //     'copyformat', 'cut', 'copy', 'paste', '|',
        //     'selectall', 'print', '|',
        //     'undo', 'redo', '|',
        //     'find', 'replace', '|',
        //     'fullsize', 'preview', 'spellcheck', 'about', '|',
        //     'bin', 'eraser'
        // ],
        uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
            filesVariableName: function (t) {
                return 'files[' + t + ']';
            },
            withCredentials: false,
            pathVariableName: 'path',
            format: 'json',
            method: 'POST',
            prepareData: function (formdata) {
                // You can add custom logic here if needed
                return formdata;
            },
            process: function (resp) {
                // Handle response if you want to upload immediately
                return resp;
            }
        },
        removeButtons: ['brush', 'file'],
        showPlaceholder: false,
        placeholder: placeholder,
        controls: {
            ul: {
                command: 'insertUnorderedList',
                tags: ['ul'],
                tooltip: 'Insert Unordered List',
                list: false
            },
            ol: {
                command: 'insertOrderedList',
                tags: ['ol'],
                tooltip: 'Insert Ordered List',
                list: false
            }
        },
        style: {
            'ul': 'list-style-type: disc !important; margin-left: 20px !important; padding-left: 20px !important;',
            'ol': 'list-style-type: decimal !important; margin-left: 20px !important; padding-left: 20px !important;',
            'li': 'margin-bottom: 5px !important; display: list-item !important;'
        },
        events: {
            // Debug events to understand the focus issue
            afterInit: (editor) => {
                console.log('Jodit Editor initialized:', editor);

                // Store original selection when dialogs open
                let storedSelection = null;

                // Monitor dialog events
                editor.events.on('beforeOpenDialog', (dialog, dialogName) => {
                    console.log('Before opening dialog:', dialogName);
                    // Store current selection
                    if (editor.selection && editor.selection.current()) {
                        storedSelection = editor.selection.save();
                        console.log('Selection saved:', storedSelection);
                    }
                });

                editor.events.on('afterOpenDialog', (dialog, dialogName) => {
                    console.log('After opening dialog:', dialogName);
                });

                editor.events.on('beforeCloseDialog', (dialog, dialogName) => {
                    console.log('Before closing dialog:', dialogName);
                });

                editor.events.on('afterCloseDialog', (dialog, dialogName) => {
                    console.log('After closing dialog:', dialogName);
                    // Restore selection if it was saved
                    if (storedSelection && editor.selection) {
                        setTimeout(() => {
                            try {
                                editor.selection.restore(storedSelection);
                                editor.focus();
                                console.log('Selection restored');
                            } catch (e) {
                                console.log('Could not restore selection:', e);
                            }
                        });
                    }
                });

                // Monitor focus events
                editor.events.on('focus', () => {
                    console.log('Editor focused');
                });

                editor.events.on('blur', () => {
                    console.log('Editor blurred');
                });

                // Monitor selection changes
                editor.events.on('selectionchange', () => {
                    console.log('Selection changed');
                });

                // Handle paste events to differentiate between internal and external content
                editor.events.on('beforePaste', (event) => {
                    const clipboardData = event.clipboardData || window.clipboardData;
                    const htmlData = clipboardData.getData('text/html');

                    // Check if the content is from the same editor (internal copy)
                    // Jodit adds specific markers to copied content
                    if (htmlData && (htmlData.includes('jodit') || htmlData.includes('<!--StartFragment-->') && htmlData.includes('<!--EndFragment-->'))) {
                        // This is internal content, paste as HTML to preserve formatting
                        event.preventDefault();
                        const cleanHtml = htmlData
                            .replace(/<!--StartFragment-->|<!--EndFragment-->/g, '')
                            .replace(/<html[^>]*>|<\/html>|<body[^>]*>|<\/body>/gi, '')
                            .trim();
                        editor.selection.insertHTML(cleanHtml);
                        return false;
                    }
                    // For external content, let the default behavior handle it (insert_as_text)
                });
            },

            // Prevent focus loss on blur during dialog operations
            beforeDestruct: () => {
                console.log('Editor being destructed');
            }
        }
    }), [placeholder]);

    // Function to calculate image sizes from base64 data URLs
    const calculateImageSizes = (content) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const images = doc.querySelectorAll('img[src^="data:image"]');

        let totalSize = 0;
        images.forEach(img => {
            const base64Data = img.src.split(',')[1];
            if (base64Data) {
                // Calculate approximate file size from base64
                totalSize += (base64Data.length * 0.75);
            }
        });

        return totalSize;
    };

    // Function to count only visible text characters, excluding HTML and empty tables
    const countCharacters = (content) => {
        if (!content) return 0;

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        // Function to recursively count text nodes
        const countTextNodes = (node) => {
            let count = 0;

            // If it's a text node, return its length
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent.length;
            }

            // Skip script and style elements
            if (node.nodeType === Node.ELEMENT_NODE &&
                (node.tagName === 'SCRIPT' || node.tagName === 'STYLE')) {
                return 0;
            }

            // Handle <p> and <td> specially for <br>
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'P' || node.tagName === 'TD') {
                    const brCount = node.querySelectorAll('br').length;
                    count += brCount; // each <br> counts as 1 char
                }
            }

            // For table cells, only count if they have content
            if (node.nodeType === Node.ELEMENT_NODE &&
                (node.tagName === 'TD' || node.tagName === 'TH')) {
                const textContent = node.textContent.replace(/\s+/g, '');
                if (!textContent) {
                    return 0;
                }
            }

            // Recursively count child nodes
            if (node.childNodes && node.childNodes.length > 0) {
                node.childNodes.forEach(child => {
                    count += countTextNodes(child);
                });
            }

            return count;
        };

        if (doc.body.innerHTML === "<p><br></p>") {
            return 0;
        }

        return countTextNodes(doc.body);
    };

    const handleEditorBlur = (newContent) => {
        console.log('Editor onBlur called with content length:', newContent?.length || 0);
        // Counter updates are now handled in onChange for real-time feedback
        onChange(newContent);
    };

    useEffect(() => {
        if (value) {
            const charCount = countCharacters(value);
            const imgSize = calculateImageSizes(value);
            setCharacterCount(charCount);
            setImageSize(imgSize);
        } else {
            setCharacterCount(0);
            setImageSize(0);
        }
    }, [value]);

    // Add MutationObserver for real-time updates
    useEffect(() => {
        if (editorRef.current && editorRef.current.container) {
            const observer = new MutationObserver(() => {
                if (editorRef.current && editorRef.current.value !== undefined) {
                    const currentContent = editorRef.current.value;
                    const charCount = countCharacters(currentContent || '');
                    const imgSize = calculateImageSizes(currentContent || '');

                    setCharacterCount(charCount);
                    setImageSize(imgSize);
                }
            });

            const editorContainer = editorRef.current.container.querySelector('.jodit-wysiwyg');
            if (editorContainer) {
                observer.observe(editorContainer, {
                    childList: true,
                    subtree: true,
                    characterData: true,
                    attributes: true
                });
            }

            return () => observer.disconnect();
        }
    }, []);


    return (
        <div className="rich-text-editor">
            <JoditEditor
                ref={editorRef}
                value={value}
                config={config}
                tabIndex={1}
                onBlur={handleEditorBlur}
            // onChange={handleEditorChange}
            />
            <div className="mt-2 space-y-1">
                <p className="text-gray-500 text-xs">
                    Supports rich formatting, copy-paste from Docs, bullet points, and tables.
                </p>
                <div className="flex justify-between items-center">
                    <p className={`text-xs ${characterCount > maxLength ? 'text-red-500' : 'text-gray-500'}`}>
                        Characters: {characterCount}/{maxLength}
                    </p>
                    {imageSize >= 0.01 * 1024 * 1024 && (
                        <p className={`text-xs ${imageSize > maxImageSizeInMB * 1024 * 1024 ? 'text-red-500' : 'text-gray-500'}`}>
                            Images: {(imageSize / (1024 * 1024)).toFixed(2)} MB / {maxImageSizeInMB} MB
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RichTextEditor;