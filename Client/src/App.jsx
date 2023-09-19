import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#bac38794]">
      <div className="ct-app-wrapper flex flex-col justify-between w-[500px] h-[80%] max-h-[750px] py-12 bg-[#67a4ab]">
        <div className="pb-3 mx-16 border-b">
          <h1 className="text-5xl mb-2">Todo List</h1>
          <p>Today i need To:</p>
        </div>
        <TodoList />
        <TodoForm />
      </div>
    </div>
  );
};

export default App;
