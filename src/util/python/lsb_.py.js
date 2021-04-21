export const code = `
#TITLE: LSB Steganography
#PURPOSE: Encode a plaintext message inside of an image using LSB insertion.
#AUTHOR: Carson Panduku 
#DATE OF CREATION: April 19

#imports
import numpy as np 
from PIL import Image


def encode_image(src, message, dest):
	"""Encodes an image with a message."""

	img = Image.open(src, 'r')
	pixel_array = np.asarray(img).copy()
	
	#calculate number of pixels in image
	if img.mode == 'RGB':
		num_pixels = pixel_array.size // 3
	elif img.mode == 'RGBA':
		num_pixels =  pixel_array.size // 4

	#add delimter to message to endicate end of message
	message += '#yeet#'

	#convert message to binary
	message = ''.join(format(ord(char), '08b') for char in message)


	#are there enough pixels in the img to accomodate the message
	if len(message) > num_pixels:
		print("Image to small or message too large. Try again.")
		return 0

	counter = 0
	for row in range(len(pixel_array)):
		for pixel in range(len(pixel_array[row])):
			for channel in range(len(pixel_array[row][pixel])):
				if counter < len(message):
					pixel_array[row][pixel][channel] = int(bin(pixel_array[row][pixel][channel])[2:9] + message[counter], 2)
					counter += 1

	new_img = Image.fromarray(pixel_array, img.mode)
	new_img.save(dest)


def decode_image(src):
	"""Decodes an image and prints the plaintext message hidden inside it"""

	img = Image.open(src, 'r')
	pixel_array = np.asarray(img)
	decoded_message = ''

	if img.mode == 'RGB':
		num_pixels = pixel_array.size // 3
	elif img.mode == 'RGBA':
		num_pixels = pixel_array.size // 4

	#collect lsb's in groups of 8
	ls_bits = ''

	for row in range(len(pixel_array)):
		for pixel in range(len(pixel_array[row])):
			for channel in range(len(pixel_array[row][pixel])):
				ls_bits += bin(pixel_array[row][pixel][channel])[-1]

	bin_char_array = []
	for val in range(0, len(ls_bits), 8):
		bin_char_array.append(ls_bits[val:val+8])

	#convert to characters
	for i in range(len(bin_char_array)):
		if decoded_message[-6:] == '#yeet#':
			break
		decoded_message = decoded_message + chr(int(bin_char_array[i], 2))

	decoded_message = decoded_message[:-6]
	return decoded_message

`
