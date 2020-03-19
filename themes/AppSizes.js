import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// landscape and potrait
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {
    
  // Window Dimensions
    height: screenHeight,
    width: screenWidth,

    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthHalfQuarter: screenWidth * 0.13,
    widthThreeQuarters: screenWidth * 0.75,

    heightHalf: screenHeight * 0.5,
    heightThird: screenHeight * 0.333,
    heightTwoThirds: screenHeight * 0.666,
    heightQuarter: screenHeight * 0.25,
    heightThreeQuarters: screenHeight * 0.75,
};
