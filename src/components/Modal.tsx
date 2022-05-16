import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

interface IPropsModal {
    isShow: boolean // 是否展示
    score: number // 本次得分
    bestScore: number // 最高得分
    onRestart: () => void // 重新开始的方法
}

export default function Modal (props: IPropsModal) {
    // if (props.isShow) return null

    const modalRoot: HTMLElement = document.getElementById('modal')!

    const wrapperEle: HTMLElement = document.createElement('div')

    // 是否现得分数超越过去最高分
    const isExceeded: boolean = props.score > props.bestScore
    const normalElem: JSX.Element = (
        <>
            <h1 className="title">Game Over</h1>
            <div className="score">Current Score：<span>{props.score || 0}</span></div>
            <div className="score best">Best Score：{props.bestScore || 0}</div>
        </>
    )
    const bestElem: JSX.Element = (
        <>
            <h1 className="title exceed">Congratulations</h1>
            <div>You Has Got A Best Score: <span>{props.score || 0}</span></div>
        </>
    )

    const modalEle: JSX.Element = (
        <div className="modal">
            { isExceeded ? bestElem : normalElem }
            <button onClick={props.onRestart}>重新开始</button>
            {/* <button>查看排行</button> */}
        </div>
    )

    // 为了单页应用，别的页面可能应用该#modal嵌入各种toast、modal等，故我在此用了这个hook，移除没用的modal
    useEffect(() => {
         // 在 Modal 的所有子元素被挂载后，
        // 这个 portal 元素会被嵌入到 DOM 树中，
        // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
        // 如果要求子组件在挂载时可以立刻接入 DOM 树，
        // 例如衡量一个 DOM 节点，
        // 或者在后代节点中使用 ‘autoFocus’，
        // 则需添加 state 到 Modal 中，
        // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
        modalRoot.appendChild(wrapperEle)

        return () => {
            modalRoot.removeChild(wrapperEle)
        }
    })

    return ReactDOM.createPortal(modalEle, wrapperEle)
}