import { Button } from '../button/button';
import styles from './NotFound.module.css';
import myImage from './poster_event_2360536.png';

export const NotFound = ({ navigate }) => {
	return (
		<div>
			<div className={styles.notFoundMessage}>
				<p>
					К сожалению такой страницы не существует... Пожалуйста, вернитесь
					назад или воспользуйтесь списком задач!{' '}
				</p>
				<Button onClick={navigate}> ← </Button>
			</div>
			<img src={myImage} alt="упс..." />
		</div>
	);
};
