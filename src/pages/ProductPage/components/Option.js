import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './Option.scss';

const Option = ({ data }) => {
  const [number, setNumber] = useState(1);
  const navigate = useNavigate();

  const plus = () => {
    setNumber(number => number + 1);
  };

  const minus = () => {
    if (number < 2) {
      setNumber(1);
      return;
    }
    setNumber(number => number - 1);
  };

  const handleBtn = button => {
    if (button === 'buy') {
      fetch(`/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
        .then(response => {
          if (response.ok === true) {
            return response.json();
          }
          alert('결제 페이지로 이동합니다!');
        })
        .then(data => {
          navigate('/order-page');
          // if (data.message === 'success') {
          //   navigate('/order-page');
          // }
        });
    } else if (button === 'basket') {
      fetch(`/`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
        .then(response => {
          if (response.ok === true) {
            return response.json();
          }
          alert('장바구니 페이지로 이동합니다!');
        })
        .then(
          data => {
            navigate('/basket-page');
          }
          //   if (data.message === 'success') {
          //     navigate('/basket-page'); }
        );
    }
  };

  return (
    <div className="product-page1">
      <img className="product-image" src={data.img} alt="고기사진" />
      <div className="product-infor">
        <div className="product-name">{data.name}</div>
        <div className="product-write">100g 당 3,550원</div>
        <div className="product-price">
          기준가 {data.price}원({data.weight}g)
        </div>
        <div className="product-option">
          옵션
          {/* <select className="menu-trigger">
            {MEET_OPTION.map(option => {
              return (
                <option className="option" key={option.id}>
                  {option.option}
                </option>
              );
            })}
          </select> */}
        </div>
        <div className="product-result">
          <div className="product-number">
            수량
            <button className="minus" onClick={minus}>
              -
            </button>
            <div className="number">{number}</div>
            <button className="plus" onClick={plus}>
              +
            </button>
          </div>
        </div>
        <div className="product-btn">
          <button onClick={() => handleBtn('buy')} className="product-buy">
            바로구매
          </button>
          <button
            onClick={() => handleBtn('basket')}
            className="product-basket"
          >
            장바구니
          </button>
        </div>
      </div>
    </div>
  );
};

export default Option;
