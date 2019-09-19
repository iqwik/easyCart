  <h2>Простой модуль EasyCart</h2>
  <p>Легко подключается и простой в использовании...</p>
  <ul>
    <li>Счетчик корзины</li>
    <li>popup-окно с содержимым корзины</li>
    <li>Добавление и удаление товаров в корзине</li>
    <li>Использование localStorage - сохранение в cookie пользовательского браузера</li>
    <li>Возможность отправить данные на сервер</li>
  </ul>
   
  ----------
  
  <h3>Сборка проекта:</h3>
    
    npm install
    npm run build --production
    
 
  ----------
  
  #Использование:
  
  <ul>
  <li>
    Добавить data-аттрибуты в верстке товара<br/><br/>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>data-id</td>
          <td>integer</td>
          <td>ID товара, желательно поставить в родительский div-обертку товара</td>
        </tr>
        <tr>
          <td>data-image</td>
          <td>string</td>
          <td>Ссылка на картинку товара</td>
        </tr>
        <tr>
          <td>data-name</td>
          <td>string</td>
          <td>Название товара</td>
        </tr>
        <tr>
          <td>data-count</td>
          <td>boolean</td>
          <td>True - активировать возможность доавлять разное кол-во товара</td>
        </tr>
        <tr>
          <td>data-price</td>
          <td>string|integer</td>
          <td>Стоимость товара</td>
        </tr>
      </tbody>
    </table><br/>
  </li>
  <li>Передать в конструктор параметры (необязательно)<br/><br/>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>source</td>
          <td>string</td>
          <td>ссылку на файл обработки данных</td>
        </tr>
        <tr>
          <td>productWrap</td>
          <td>string</td>
          <td>Класс обертки продукта</td>
        </tr>
        <tr>
          <td>addToCartBtn</td>
          <td>string</td>
          <td>Класс кнопки "Добавить в корзину"</td>
        </tr>
        <tr>
          <td>wrapperCartID</td>
          <td>string</td>
          <td>ID счетчика и вызова корзины при клике</td>
        </tr>
        <tr>
          <td>modalClass</td>
          <td>string</td>
          <td>Класс модального окна</td>
        </tr>
        <tr>
          <td>modalClasses</td>
          <td>object</td>
          <td>Объект содержащий классы всех блоков модального окна</td>
        </tr>
      </tbody>
    </table><br/>
  </li>
  </ul>
