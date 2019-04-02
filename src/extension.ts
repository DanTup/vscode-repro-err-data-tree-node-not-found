import * as fs from "fs";
import * as path from "path";
import { window, workspace, ExtensionContext, Uri, commands } from "vscode";

export function activate(context: ExtensionContext) {
	if (!workspace.workspaceFolders || !workspace.workspaceFolders.length) {
		window.showWarningMessage("Open a folder");
	}
	const wf = workspace.workspaceFolders![0];
	const dartTriggerFile = path.join(wf.uri.fsPath, "trigger.txt");
	if (fs.existsSync(dartTriggerFile)) {
		fs.unlinkSync(dartTriggerFile);
		createDartProject(wf.uri.fsPath);
	}
}

async function createDartProject(projectPath: string): Promise<boolean> {
	mkDirRecursive(path.join(projectPath, "web"));
	fs.writeFileSync(path.join(projectPath, "web/styles.css"), "test");
	commands.executeCommand("vscode.open", Uri.file(path.join(projectPath, "web/styles.css")));

	return true;
}

export function mkDirRecursive(folder: string) {
	const parent = path.dirname(folder);
	if (!fs.existsSync(parent)) {
		mkDirRecursive(parent);
	}
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
}

export function deactivate() { }
