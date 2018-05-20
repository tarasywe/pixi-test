import * as PIXI from 'pixi.js';
import { ScenesManager } from '../core/ScenesManager';
import { Scene } from '../core/Scene';
import { MenuScene } from './scenes/MenuScene';
import { CardScene } from './scenes/CardScene';
import { RandomScene } from './scenes/RandomScene';
import { FireScene } from './scenes/FireScene';

export class Game extends PIXI.Application {

	app: PIXI.Application;
	stage: PIXI.Container;
	scene: Scene;
	mainContainer: PIXI.Container;
	menuContainer: PIXI.Container;
	loader: PIXI.loaders.Loader;
	scenesManager: ScenesManager;
	demoText: PIXI.Text;

	constructor() {
		super();
	}

	start() {
		this.app = new PIXI.Application(window.innerWidth, window.innerHeight, { transparent: true });
		this.scenesManager = new ScenesManager();
		
		document.body.appendChild(this.app.view);
		this.app.renderer.autoResize = true;

		this.mainContainer = new PIXI.Container;
		this.menuContainer = new PIXI.Container;
		this.app.stage.addChild(this.mainContainer);
		this.app.stage.addChild(this.menuContainer);

		this.loader.add('../assets/button.png').load(() => this.setup());

		window.addEventListener("resize", () => {
			this.app.renderer.resize(window.innerWidth, window.innerHeight);
		});
	}

	loop = () => {
		const x = (this.app.renderer.width / 2) - (this.menuContainer.width / 2);
		const y = (this.app.renderer.height / 2) - (this.scene.height / 2);
		this.scene.setTransform(x, y);
		this.scene.updateTransform();
		this.menuContainer.x = x;
		this.menuContainer.updateTransform();
		this.renderer.render(this.app.stage);
    	requestAnimationFrame(() => this.loop());
    }

	setup() {
		const cards = this.scenesManager.createScene('cardScene', CardScene);
		this.mainContainer.addChild(cards);

		const random = this.scenesManager.createScene('randomScene', RandomScene);
		this.mainContainer.addChild(random);

		const fire = this.scenesManager.createScene('fireScene', FireScene);
		this.mainContainer.addChild(fire);

		const menu = this.scenesManager.createScene('menuScene', MenuScene);
		menu.setNavigator(this.activateScene);
		menu.setMenuManager(this.scenesManager);
		this.menuContainer.addChild(menu);
		menu.renderable = true;

		this.activateScene('cardScene');

		this.loop();
	}

	activateScene = (sceneName) => {
		this.scene = this.scenesManager.activateScene(sceneName);
	}

}