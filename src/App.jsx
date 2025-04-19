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
    
    const dateNow = new Date()
    const getDateFormat =  (date, separator) => {
        let data = date.getDate();
        let month = date.getMonth();
        const year = date.getFullYear();
        function proba(data, month) {
            if (data < 10) {
                data = `0${data}`
            };
            if (month < 1) {
                month = `${month}1`
            } else if (month < 10) {
                month = `0${month}`
            }
            return {data, month}
        }; 

        const form = proba(data, month);
        data = form.data;
        month = form.month
        
        return `${data}${separator}${month}${separator}${year}`
    };

    const time = {
      hours: dateNow.getHours(),
      minutes: dateNow.getMinutes(),
      seconds: dateNow.getSeconds()
    }

    const onAddButtonClick = () => {
        if (isValueVaild) {
            setList([...list, value]);
            setValue('');
            setError('');
        };

        const newItem = {
            id: Date.now(),
            value: value,
            date: getDateFormat(dateNow, '.'),
            time: `${time.hours}:${time.minutes}:${time.seconds}`
        };
        const updatedList = [...list, newItem];
        setList(updatedList)
    };

    const isVisibalElement = list.length === 0;
    const isValueVaild = value.length >= 3 ? true : false;
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
                                {item.value} {item.date} {item.time}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
};