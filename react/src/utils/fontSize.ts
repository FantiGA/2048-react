/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-19 10:17:00
 * @LastEditors: swancai
 * @Description: 
 * @FilePath: /2048-react/src/fontSize.ts
 */
function setBaseFontSize (): void {
    const clientWidth: number = Math.max(Math.min(document.documentElement.clientWidth, 420), 320)
    const fontsize : number = clientWidth / 7.5
    document.documentElement.style.fontSize = `${fontsize}px`
}

setBaseFontSize()
window.onresize = setBaseFontSize
