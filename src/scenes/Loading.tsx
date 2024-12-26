import React, { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

interface LoadingPageProps {
  onLoadingComplete: (isFirstTime: boolean) => void
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          // 模拟加载资源与调用 API
          const isFirstTime = !localStorage.getItem('hasPlayedBefore')
          if (isFirstTime) {
            localStorage.setItem('hasPlayedBefore', 'true')
          }
          onLoadingComplete(isFirstTime)
          return 100
        }
        return prevProgress + 100 / 30
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  useEffect(() => {
    if (progress >= 100) {
      // 后续应添加跳转到游戏页面逻辑
    }
  }, [progress])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">二十一点</h1>
      <div className="w-64 mb-4">
        <Progress value={progress} className="w-full" />
      </div>
      <p className="text-xl">加载中... {Math.round(progress)}%</p>
    </div>
  )
}

export default LoadingPage
