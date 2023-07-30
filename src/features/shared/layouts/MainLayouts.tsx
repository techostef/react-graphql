import React from 'react';
import { css } from '@emotion/css';
import theme from '../config/theme';
import { MediaScreen } from '../constants/MediaScreen';
import Header from './Header';


interface IProps {
  children: React.ReactNode
}

function MainLayout ({ children }: IProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: theme.color.dark,
    paddingBottom: theme.spacing.xl,
  }),
  content: css({
    width: theme.width.desktop,
    [MediaScreen.tablet]: {
      width: '100%',
    },
    [MediaScreen.mobile]: {
      width: '100%',
    }
  })
}

export default MainLayout;