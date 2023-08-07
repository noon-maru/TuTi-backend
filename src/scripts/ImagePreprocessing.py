from PIL import Image
import numpy as np
import sys

def calculate_average_grayscale(image_path):
    img = Image.open(image_path)
    np_img = np.array(img)
    selected_region = np_img[0:60, 0:400]
    
    R = selected_region[:, :, 0]
    G = selected_region[:, :, 1]
    B = selected_region[:, :, 2]
    
    grayscale = 0.2989 * R + 0.5870 * G + 0.1140 * B
    average_grayscale = grayscale.mean()
    
    return average_grayscale


if __name__ == "__main__":
    image_path = sys.argv[1]
    average_grayscale = calculate_average_grayscale(image_path)
    print(average_grayscale)
