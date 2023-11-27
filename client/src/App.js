import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from './components/Items'

function App() {
  //useState: Отвечает за создание и управление состоянием компонента.
  //useRef: Создает изменяемый объект, который может использоваться для сохранения и обращения к изменяемому значению
  //useEffect- это способ сказать компоненту: "Когда что-то произойдет (например, компонент загрузится, обновится или удалится), сделай это." То, что "это" означает, может быть чем угодно: загрузка данных, изменение состояния
  //Создает состояние state с начальным значением объекта
  //setState - функция для обновления этого состояния. Обычно используется для хранения данных формы или информации, связанной с компонентом.
  const [ state, setState ] = useState({ message: "", name: "" })
  //false показывает, что процесс отправки имени еще не начат
  const [nameSubmit, setNameSubmit] = useState(false)
  //используется для хранения значения имени пользователя
  const [nameUser, setNameUser]=useState("")
  //используется для хранения сообщений чата
  const [ chat, setChat ] = useState([])
  //используется для сохранения ссылки на объект, который нужно сохранить между рендерами компонента (например, объекта сокета для взаимодействия с сервером).
  const socketRef = useRef()

  // для установки соединения с сокетом и прослушивания события "message" с помощью библиотеки Socket.IO 
  useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
      //Устанавливает слушатель события "message"
      //и добавляет новое сообщение в массив чата.
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
      //при вызове этой функции происходит отключение текущего сокета.
			return () => socketRef.current.disconnect()
		},
    // реагирует на изменения состояния chat 
		[ chat ]
	)

  const onContentChange =(e) =>{
    //Создается локальная переменная getNameUser, которая получает значение из переменной состояния nameUser
    const getNameUser =nameUser;
    //Выводит в консоль значение, введенное пользователем в элемент, который вызвал событие e.
    console.log(e.target.value)
    //Используется функция setState для обновления состояния. 
    setState({ ...state, name: getNameUser , message: e.target.value })
    //Выводит в консоль объект состояния state после его обновления
    console.log(state)
  }

  const onMessageSubmit = (e) => {
    //Деструктурирует объект состояния state, извлекая из него значения name и message. Это позволяет использовать их без прямого обращения к state.name и state.message.
		const { name, message } = state
    //Отправляет сообщение через сокет (socketRef.current) на сервер, используя событие "message".
		socketRef.current.emit("message", { name, message })
    //Вместо отправки данных или перехода по ссылке страница остается без изменений
		e.preventDefault()
    //Обновляет состояние state
		setState({ message: "", name })
    console.log(state)
	}
  //формирует интерфейс чата, отображая сообщения в соответствии с отправителем, 
  //выравнивая их по левому или правому краю в зависимости от того, от кого сообщение пришло.
	const renderChat = () => {
    // Каждый элемент массива содержит сообщение чата и его отправителя.
		return chat.map(({ name, message }, index) => (
      // тернарный оператор, который проверяет, совпадает ли имя отправителя сообщения с именем пользователя (nameUser).
       nameUser == name ? (
        <div>
        <div className="bg1 mb-2 p-2 float-right box-messenger">
          <p className="mb-0 text-messenger text-white">{message} </p>
        </div>
        <div style={{clear: 'both'}} />
      </div>
       ):(
        <div>
        <div className="bg2 mb-2 p-2 float-left box-messenger">
          <p className="mb-0 text-messenger">{message}</p>
        </div>
        <div style={{clear: 'both'}} />
      </div>
       )
			
		))
	}

  const [orders, setOrders] = useState([]);
  const [items] = useState([
        {
          id: 1,
          title: 'Композиция Desire Me',
          img: 'choco1.jfif',
          desc: '',
          category: '',
          price: '15500'
        },
        {
          id: 2,
          title: 'Композиция Бланш',
          img: 'choco2.jfif',
          desc: '',
          category: '',
          price: '8990'
        },
        {
          id: 3,
          title: 'Композиция Шоколадный Прованс',
          img: 'choco3.jfif',
          desc: '',
          category: '',
          price: '6990'
        },
        {
          id: 4,
          title: 'Композиция Красота Любви',
          img: 'choco4.jfif',
          desc: '',
          category: '',
          price: '11000'
        },
        {
          id: 5,
          title: 'Композиция Вдохновение',
          img: 'choco5.jfif',
          desc: '',
          category: '',
          price: '5990'
        },
        {
          id: 6,
          title: 'Композиция Клубничный Сюрприз',
          img: 'choco6.jfif',
          desc: '',
          category: '',
          price: '8000'
        },
        {
          id: 7,
          title: 'Композиция Вояж',
          img: 'choco7.jfif',
          desc: '',
          category: '',
          price: '11990'
        },
        {
          id: 8,
          title: 'Композиция Романтик',
          img: 'choco8.jfif',
          desc: '',
          category: '',
          price: '7990'
        },
        {
          id: 9,
          title: 'Композиция Полярные Сны',
          img: 'choco9.jfif',
          desc: '',
          category: '',
          price: '19000'
        },
        {
          id: 10,
          title: 'Композиция Эльда',
          img: 'choco10.jfif',
          desc: '',
          category: '',
          price: '13000'
        },
        {
          id: 11,
          title: 'Композиция Одно Желание',
          img: 'choco11.jfif',
          desc: '',
          category: '',
          price: '8000'
        },
        {
          id: 12,
          title: 'Композиция Клубничная Мелодия',
          img: 'choco12.jfif',
          desc: '',
          category: '',
          price: '10990'
        },
        {
          id: 13,
          title: 'Композиция Нежное Сердце',
          img: 'choco13.jfif',
          desc: '',
          category: '',
          price: '24990'
        },
        {
          id: 14,
          title: 'Композиция Ферроль',
          img: 'choco14.jfif',
          desc: '',
          category: '',
          price: '12000'
        },
        {
          id: 15,
          title: 'Композиция Мелита',
          img: 'choco15.jfif',
          desc: '',
          category: '',
          price: '7990'
        },
      ]);
      //используется для обновления имени пользователя при вводе данных в соответствующее текстовое поле.
      const onNameChange = (e) =>{
        setNameUser(e.target.value)
      }
      //такое использование позволяет сигнализировать о том, что отправка имени завершена или форма была отправлена.
      const nameSubmitForm =()=>{
        setNameSubmit(true)
      }

  const deleteOrder = (id) => {
    setOrders(orders.filter(el => el.id !== id));
  }

  const addToOrder = (item) => {
    let isInArray = false;
    orders.forEach(el => {
      if (el.id === item.id) {
        isInArray = true;
      }
    });
    if (!isInArray) {
      setOrders([...orders, item]);
    }
  }

  //Этот код позволяет переключаться между двумя состояниями интерфейса: 
  //одно состояние отображает чат с сообщениями, 
  //а другое - форму для ввода имени пользователя перед входом в чат
  return (
    <div className="wrapper">
      <Header orders={orders} onDelete={deleteOrder}/>
      <Items items={items} onAdd={addToOrder}/>
      { nameSubmit ? (
      <div className="box-main">
    <div className="bg1 p-3 box-header">
      <p className="font-weight-bold text-white mb-0">{nameUser}</p>
    </div>
    <div className="p-2 box-content">
    {renderChat()}
    </div>
    <form onSubmit={onMessageSubmit}>
    <div className="pl-2 pt-2 box-bottom">
    
      <div className="box-input">
        <input onChange={(e) => onContentChange(e)} value={state.message} name="message"
            placeholder="Please a reply" 
            className="bg2 pl-2 input-text" 
            type="text" />
      </div>
      <div className="px-2 box-button">
        <button className="bg1 text-center reply-button">
          <i className="fa fa-paper-plane text-white button-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
    </form>
  </div>
    ):(
      <div className="form-container">
      <form onSubmit={nameSubmitForm}>
        <input 
          name="name" 
          onChange={(e) => onNameChange(e)} 
          value={nameUser.name} 
          placeholder="Введите имя" 
        />
        <button type="submit">Чат</button>
      </form>
    </div>
    )
   }
      <Footer />
    </div>
  );

}

export default App;
