import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class App extends React.Component {
	handleEditorChange = (e) => {
		console.log('Content was updated:', e.target.getContent());
	};

	render() {
		return (
			<Editor
				initialValue="<p>Type some thing ...</p>"
				init={{
					plugins: 'link image code',
					toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
				}}
				onChange={this.handleEditorChange}
			/>
		);
	}
}

export default App;
