import Radium from 'radium'
import About from './About'
import Header from './Header'

// const styleObj = {
//   width: 100,
//   height: 100,
//   backgroundColor: 'yellow',
//   ":hover": { backgroundColor: 'skyblue' },
//   "@media (max-width: 1000px)": { width: 300 }
// }
// const arr = [
//   {
//     name: 'zs',
//     age: 18,
//     id: 1
//   },
//   {
//     name: 'ls',
//     age: 20,
//     id: 2
//   }
// ]

// function App() {
//   const res = arr.map(item => {
//     return (
//       <li key={ item.id }>
//         <span>{ item.name }</span>
//         <span>{ item.age }</span>
//       </li>
//     )
//   })
//   return <ul style={ styleObj }>{ res }</ul>
// }

const obj = {
  name: 'zs',
  age: 1
}

// function App () {
//   return (
//     <div>
//       <Header name={"logo"} age={10} />
//       <About />
//     </div>
//   )
// }
function App () {
  return (
    <div>
      {/* <Header {...obj} /> */}
      <Header>
        <p>header  p</p>
      </Header>
      <About />
    </div>
  )
}

export default Radium(App)
