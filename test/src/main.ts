import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
    import "cesium/Build/Cesium/Widgets/widgets.css";
                        import ElementPlus from 'element-plus'
            import 'element-plus/dist/index.css'
                            let app=createApp(App)
                                    app.use(ElementPlus)
                                            app.mount('#app')