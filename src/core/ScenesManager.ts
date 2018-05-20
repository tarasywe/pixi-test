import { Scene } from './Scene';

export class ScenesManager {
	
	private currentScene: Scene;
	public scenes: any = {};

	constructor() {

	}

	public createScene(sceneId: string, scene: new () => Scene = Scene): Scene {
		const createdScene = new scene();
		this.scenes[sceneId] = createdScene;
		createdScene.renderable = false;
		return createdScene;
	}

	public activateScene(sceneId: string): Scene {
		if(this.currentScene){
			this.currentScene.renderable = false;
		}
		this.currentScene = this.scenes[sceneId];
		this.currentScene.renderable = true;
		return this.currentScene;
	}

	public setPosition(x: number, y: number): void {
		this.currentScene.x = x;
		this.currentScene.y = y;
	}
}