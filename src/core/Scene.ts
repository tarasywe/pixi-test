import * as PIXI from 'pixi.js';
import { ScenesManager } from './ScenesManager';

export class Scene extends PIXI.Container {
	
	private manager: ScenesManager;
	private navigateCallback;
	private container: PIXI.Container;
	private sceneNames = ['Card Scene', 'Random Images and texts', 'Particle Fire Scene']

	constructor() {
		super();
	}

	public setMenuManager = (manager: ScenesManager) => this.manager = manager;

	public getManager = (): ScenesManager => this.manager;

	public setNavigator = (cb): void => this.navigateCallback = cb;

	public navigate = (scene: string): void => this.navigateCallback(scene);

	createView(sceneName: number) {
        this.container = new PIXI.Container;
        
		const style = { fontFamily: "Helvetica, sans-serif", fontSize: "18px", fill: 'black' };
		const title = this.sceneNames[sceneName];
		const text = new PIXI.Text(title, style);
		text.y = 100

		this.container.addChild(text);
		this.addChild(this.container);
	}

}