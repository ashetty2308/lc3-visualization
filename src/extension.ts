// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lc3-visualization" is now active!');

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

		/*
			output:
			C {a: 0, b: 'public class SecondaryWorld {', c: false}
			C {a: 1, b: '    public static void main(String[] args) {', c: false}
			C {a: 2, b: '        System.out.println("Hello 2nd world!");', c: false}
			C {a: 3, b: '    }', c: false}
			C {a: 4, b: '}', c: false}
			C {a: 5, b: '', c: true}
		*/
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

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
