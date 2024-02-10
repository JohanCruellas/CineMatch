import { boot } from 'quasar/wrappers'
import { useGlobalStore } from "../stores/globalStore";

export default boot(({ app }) => {
    app.config.globalProperties.$store = useGlobalStore()
})