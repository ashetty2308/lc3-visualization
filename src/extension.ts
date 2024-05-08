// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import MyComponent from './my_component';
import { register } from 'module';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lc3-visualization" is now active!');

	let addComment = vscode.commands.registerCommand('lc3-visualization.addComment', () => {
		let activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showInformationMessage('active editor is null!')
			return;
		}

		let currentPosition = activeEditor.selection.active;
		let currentLineText = activeEditor.document.lineAt(currentPosition.line).text;
		let commentPosition = currentPosition.with(currentPosition.line, 0);

		
		// array that stores registers in a user's line of code based on cursor placement
		// will allow us to create a comment block with said registers in mind
		let registersContained = [];
		for (let i = 0; i <= 7; i++) {
			if (currentLineText.includes("R" + i)) {
				registersContained.push("R" + i);
			}
		}

		let commentBlock = ";;** ADD REGISTER DESCRIPTIONS BELOW;;**";
		
		registersContained.forEach(register => {
			commentBlock += `\n;; ${register} : `;
		})

		activeEditor.selection = new vscode.Selection(commentPosition, commentPosition);
		activeEditor.edit(editBuilder => {
			editBuilder.insert(activeEditor.selection.active, commentBlock + '\n');
		});
	});

	let webview = vscode.commands.registerCommand('lc3-visualization.webview', () => {
		let panel = vscode.window.createWebviewPanel(
			"webview",
			"Web View",
			vscode.ViewColumn.Six,
			{
				localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")],
				enableScripts: true
			}
		);

		panel.webview.html = `
		<h1>This is Heading 1</h1>
		<h2>This is Heading 2</h2>
		<h3>This is Heading 3</h3>
		<h4>This is Heading 4</h4>
		<h5>This is Heading 5</h5>
		`;
		const scriptPath= panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "main.js"))
		const cssStyle = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "style.css"))
		const imgSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "mcfc.svg"))
	
		let activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showInformationMessage('active editor is null!')
			return;
		}
		let lineCount = activeEditor.document.lineCount;
		let registerDictionary: { [key: string]: string } = {
			"R0": "",
			"R1": "",
			"R2": "",
			"R3": "",
			"R4": "",
			"R5": "",
			"R6": "",
			"R7": ""
		};
		
		for (let lineNumber = 0; lineNumber < lineCount; lineNumber++) {
			let eachLine = activeEditor.document.lineAt(lineNumber);
			if (eachLine.text.trim().startsWith(';') && !eachLine.text.trim().startsWith(';;**')) {
				let registerNumber = eachLine.text.substring(2, eachLine.text.indexOf(":")).trim();
				let registerDescriptions = eachLine.text.substring(eachLine.text.indexOf(":") + 1).trim();
				if (registerDescriptions !== "n/a") {
					registerDictionary[registerNumber as keyof typeof registerDictionary] = registerDescriptions;
				}
			}
		}

		console.log(registerDictionary);

		panel.webview.html = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<script src="${scriptPath}"></script>
				<link rel="stylesheet" type="text/css" href="${cssStyle}" />
			</head>
			<body>
			<h1>Count:</h1>
				<p id="count">0</p>
			<button onclick="changeHeading()">Add</button>
			<div class="container">
				<img src="${imgSrc}" width="200" />
				<div class="form">
					<code>Title</code>
					<input />
					<code>Code</code>
					<textarea></textarea>
					<button>Submit</button>
				</div>
			</div>
			</body>
			</html>`
	
	});


	context.subscriptions.push(webview);

	/*
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('lc3-visualization.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Adits World says Hello!');
	});

	let getText = vscode.commands.registerCommand('lc3-visualization.getText', () => {
		// activeTextEditor gets the current editor that is open. gets the particular file too of the current directory.
		// need to check if something is even open, otherwise the value is null
		let activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showInformationMessage('active editor is null!')
			return;
		}
		// get the entire document's content as a string text (file user has opened, not all at once)
		let text = activeEditor.document.getText();
		console.log(text);

		// gets the number of lines in the document (includes empty lines)
		let lineCount = activeEditor.document.lineCount;
		console.log(lineCount);

		// get entire file system path
		let fileName = activeEditor.document.fileName;
		console.log(fileName);
		// output: /Users/aditshetty/testing_folder/SecondaryWorld.java


		// for loop that goes line by line of the entire document and prints out each line
		for (let lineNumber = 0; lineNumber < lineCount; lineNumber++) {
			let line = activeEditor.document.lineAt(lineNumber);
			console.log(line);
		}

		
			output:
			C {a: 0, b: 'public class SecondaryWorld {', c: false}
			C {a: 1, b: '    public static void main(String[] args) {', c: false}
			C {a: 2, b: '        System.out.println("Hello 2nd world!");', c: false}
			C {a: 3, b: '    }', c: false}
			C {a: 4, b: '}', c: false}
			C {a: 5, b: '', c: true}
		
	});
	
	let addComment = vscode.commands.registerCommand('lc3-visualization.addComment', () => {
		let activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showInformationMessage('active editor is null!')
			return;
		}
		const commentBlock = [
			';;;;;;;;;;;;;;;;;',
			';; ADD COMMENT ;;',
			';;;;;;;;;;;;;;;;;'
		]
		activeEditor.edit(editBuilder => {
			editBuilder.insert(activeEditor.selection.active, commentBlock.join('\n'));
		});
	});

	// context.subscriptions.push(disposable);


	let reactJs = vscode.commands.registerCommand('lc3-visualization.reactJs', () => {
		// Create a new webview panel
		const panel = vscode.window.createWebviewPanel(
			'myExtension',
			'My Extension',
			vscode.ViewColumn.One,
			{}
		);
	
		// Get the HTML content to render your React component
		const reactHtml = `<div id="root"></div>`;
	
		// Set the HTML content of the webview panel
		panel.webview.html = reactHtml;
	});
	
	// Register the command
	// context.subscriptions.push(disposable);
	*/
}

// This method is called when your extension is deactivated
export function deactivate() {}
