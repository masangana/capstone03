import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

const cardList = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';



export const fetchCardList = createAsyncThunk('cardList', async () => {
  const response = await axios.get(cardList);
  console.log(response.data);
  return response.data;
});

const detailsSlice = createSlice({
    name: 'details',
    initialState,
       extraReducers: {
        [fetchCardList.fulfilled]: (state, action) => {
            const cards = action.payload.data.map(card =>( {id: card.id,
                    name: card.name,
                    image: card.image_url,
                    type: card.type,
                    attribute: card.attribute,
                    atk: card.atk,
                    def: card.def,
                    level: card.level,
                }  
        ));
    return cards;
}
    }
}
);

export default detailsSlice.reducer;