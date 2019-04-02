import * as fs from "fs";
import * as path from "path";
import { Uri, window, workspace, ExtensionContext } from "vscode";

export const isWin = /^win/.test(process.platform);

export function activate(context: ExtensionContext) {
	if (!workspace.workspaceFolders || !workspace.workspaceFolders.length) {
		window.showWarningMessage("Open a folder");
	}

	const wf = workspace.workspaceFolders![0];
	const dartTriggerFile = path.join(fsPath(wf.uri), "trigger.txt");
	if (fs.existsSync(dartTriggerFile)) {
		fs.unlinkSync(dartTriggerFile);
		createDartProject(fsPath(wf.uri));
	}
}

async function createDartProject(projectPath: string): Promise<boolean> {
	// const code = await vs.commands.executeCommand("_dart.create", projectPath, templateName) as number;
	// return code === 0;

	mkDirRecursive(path.join(projectPath, "lib/src/todo_list"));
	mkDirRecursive(path.join(projectPath, "test"));
	mkDirRecursive(path.join(projectPath, "web"));
	fs.writeFileSync(path.join(projectPath, ".gitignore"), "test");
	fs.writeFileSync(path.join(projectPath, "CHANGELOG.md"), "test");
	fs.writeFileSync(path.join(projectPath, "README.md"), "test");
	fs.writeFileSync(path.join(projectPath, "analysis_options.yaml"), "test");
	fs.writeFileSync(path.join(projectPath, "lib/app_component.css"), "test");
	fs.writeFileSync(path.join(projectPath, "lib/app_component.dart"), "test");
	fs.writeFileSync(path.join(projectPath, "lib/app_component.html"), "test");
	fs.writeFileSync(path.join(projectPath, "lib/src/todo_list/todo_list_component.css"), "test");
	fs.writeFileSync(path.join(projectPath, "lib/src/todo_list/todo_list_component.dart"), "test");
	fs.writeFileSync(path.join(projectPath, "lib/src/todo_list/todo_list_component.html"), "test");
	fs.writeFileSync(path.join(projectPath, "lib/src/todo_list/todo_list_service.dart"), "test");
	fs.writeFileSync(path.join(projectPath, "pubspec.yaml"), "test");
	fs.writeFileSync(path.join(projectPath, "test/app_test.dart"), "test");
	fs.writeFileSync(path.join(projectPath, "web/favicon.png"), "test");
	fs.writeFileSync(path.join(projectPath, "web/index.html"), "test");
	fs.writeFileSync(path.join(projectPath, "web/main.dart"), "test");
	fs.writeFileSync(path.join(projectPath, "web/styles.css"), "test");

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

export function fsPath(uri: Uri | string) {
	// tslint:disable-next-line:disallow-fspath
	return forceWindowsDriveLetterToUppercase(uri instanceof Uri ? uri.fsPath : uri);
}

export function forceWindowsDriveLetterToUppercase(p: string): string {
	if (p && isWin && path.isAbsolute(p) && p.charAt(0) === p.charAt(0).toLowerCase()) {
		p = p.substr(0, 1).toUpperCase() + p.substr(1);
	}
	return p;
}

export function deactivate() { }
