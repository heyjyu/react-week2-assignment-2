/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });
  return element;
}

const numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const signList = ['+', '-', '*', '/', '='];

function maths(leftNumber, rightNumber, saveSign) {
  let left = Number(leftNumber);
  const right = Number(rightNumber);
  if (saveSign === '+') {
    left += right;
  } else if (saveSign === '-') {
    left -= right;
  } else if (saveSign === '*') {
    left *= right;
  } else if (saveSign === '/') {
    left /= right;
  }
  return left;
}

function render(leftNumber, rightNumber, paraSign) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="result">
        {
          rightNumber === ''
            ? leftNumber
            : rightNumber
        }
      </p>
      <p>
        {

          numberList.map((clickedNumber) => (
            <button
              type="button"
              onClick={() => (paraSign === ''
                ? render(leftNumber + clickedNumber, rightNumber, '')
                : render(leftNumber, rightNumber + clickedNumber, paraSign))}
            >
              {clickedNumber}
            </button>
          ))
        }
      </p>
      <p>
        {
          signList.map((clickedSign) => (
            <button
              type="button"
              onClick={() => (paraSign === ''
                ? render(leftNumber, rightNumber, clickedSign)
                : render(maths(leftNumber, rightNumber, paraSign), '', clickedSign))}
            >
              {clickedSign}
            </button>
          ))
        }
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}
render('', '', '');
