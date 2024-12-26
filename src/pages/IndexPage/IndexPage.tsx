import type { FC } from 'react'
import { Page } from '@/components/Page.tsx'
import LoadingScene  from '@/scenes/Loading.tsx'
import { useSceneStore } from '@/store/scene.store'
import { useShallow } from 'zustand/shallow'

export const IndexPage: FC = () => {
  // 使用 zustand 的 useSceneStore 来获取和更新当前场景状态
  const { setCurrentScene, currentScene } = useSceneStore(
    useShallow((state) => ({
      setCurrentScene: state.setCurrentScene,
      currentScene: state.currentScene
    }))
  )
  // 根据当前场景状态来渲染相应的场景组件
  const renderScene = () => {
    switch (currentScene) {
      case 'loading':
        return <LoadingScene />
      // 后续可按照相同模式依次添加其他场景的渲染逻辑
      // case "registration":
      //     return <RegistrationScene />;
      // case "dailyReward":
      //     return <DailyRewardScene />;
      // case "achievements":
      //     return <AchievementsScene />;
      // case "tournament":
      //     return <TournamentScene />;
      // case "casino":
      //     return <CasinoScene />;
      // case "task":
      //     return <TaskScene />;
      // case "stats":
      //     return <StatsScene />;
      // case "settings":
      //     return <SettingsScene />;
      // case "betting":
      //     return <BettingScene />;
      // case "game":
      //     return <GameScene />;
      default:
        return <div>未知场景</div>
    }
  }
  return <Page back={false}>{renderScene()}</Page>
}
