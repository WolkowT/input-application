import { useState } from 'react'
import styles from './App.module.css';

export const App = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    const onInputButtonClick = () => {
        const promptValue = prompt('Введите значение');
        if (promptValue.length < 3) {
            setError('Введенное значение должно содержать минимум 3 символа')
        } else {
            setError('');
            setValue(promptValue);
        };
    };
    
    const onAddButtonClick = () => {
        if (isValueVaild) {
            setList([...list, value]);
            setValue('');
            setError('');
        };

        const newItem = {
            id: Date.now(),
            value: value,
            date: (new Date()).toLocaleString(),
        };
        const updatedList = [...list, newItem];
        setList(updatedList)
    };

    const isVisibalElement = list.length === 0;
    const isValueVaild = value.length >= 3;
    const isVisibal = Boolean(error);
    
    


    return (
        <>
            <div className={styles.app}>
                <h1 className={styles.pageHeading}>Ввод значения</h1>
                <p className={styles.noMarginText}>
                Текущее значение <code>value</code>: "<output className={styles.currentValue}>{value}</output>"
                </p>
                {isVisibal ? <div className={styles.error}>{error}</div> : null}
                <div className={styles.buttonsContainer}>
                    <button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
                    <button className={styles.button} disabled={!isValueVaild} onClick={onAddButtonClick}>Добавить в список</button>
                </div>
                <div className={styles.listContainer}>
                    <h2 className={styles.listHeading}>Список:</h2>
                    {isVisibalElement ? <p className={styles.noMarginText}>Нет добавленных элементов</p> : null}
                    <ul className={styles.list}>
                        {list.map(item => (
                            <li className={styles.listItem} key={item.id}>
                                {item.value} {item.date} 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
};