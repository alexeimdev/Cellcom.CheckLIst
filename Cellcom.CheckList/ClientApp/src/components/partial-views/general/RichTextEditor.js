import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/he';


export default function RichTextEditor(props) {

    const radioGroupRef = React.useRef(null);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleChange = (value) => {
        props.onChange(value);
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                language: 'he',
                alignment: ['left', 'right']
            }}

            data={props.value}
            onInit={editor => {}}
            onChange={(event, editor) => {
                handleChange(editor.getData());
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
        />
    )
}