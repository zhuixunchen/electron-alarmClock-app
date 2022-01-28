import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { TimePicker, Button } from 'antd';
import moment from 'moment';
import './alarm.css';

const format = 'HH:mm:ss';
const defaultTime = '10:50:00';

const Alarm: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [clock, setClock] = useState<string>(defaultTime);

  const sendInfoToIPC = (): void => {
    ipcRenderer.send('show-notification', '点餐时间到了', '记得按时点餐吃饭');
  };

  useEffect(() => {
    const alarmTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(alarmTimer);
    };
  }, []);

  useEffect(() => {
    if (currentTime && moment(currentTime).format('HH:mm:ss') === clock) {
      sendInfoToIPC();
    }
  }, [currentTime]);

  return (
    <div className="container">
      <div>
        <span className="testFypToday">设置闹钟时间</span>
        <TimePicker
          defaultValue={moment(defaultTime, format)}
          format={format}
          onChange={(_, timeString) => {
            setTime(timeString);
          }}
        />
      </div>
      <Button
        size="small"
        onClick={() => {
          setClock(time);
        }}
      >
        设置
      </Button>
      {/* <button onClick={handleClick}>Click</button> */}
    </div>
  );
};

export default Alarm;
