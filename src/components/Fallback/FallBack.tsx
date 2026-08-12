// `output` вместо `<div role="status">`: семантический тег несёт ту же роль
// для скринридеров. Класс Bootstrap на отображение не влияет, spinner-grow
// работает на любом блочном элементе.
const FallBack = () => (
  <output className="spinner-grow d-block">
    <span className="visually-hidden">Loading...</span>
  </output>
);

export default FallBack;
