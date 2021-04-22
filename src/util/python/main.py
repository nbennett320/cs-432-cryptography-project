from lsb import encode_image, decode_image

while True:
    print("Welcome to the lsb stego-machine. What", 
        "would you like to do today?")

    print("Encode an image -- 'E'")
    print("Decode an image -- 'D'")
    print("Quit -- 'Q'")
    choice = input()

    if choice.lower() == 'e':
        temp = "Which image would you like to encode?\n"
        src = input(temp)

        temp = "What is your secret message?\n"
        message = input(temp)

        temp = "What is the destination image?\n"
        dest = input(temp)

        
        print("encoding . . .")
        encode_image(src, message, dest)
        print("Done!")

    elif choice.lower() == 'd':
        temp = "Which image are you decoding?\n"
        src = input(temp)
        
        print("decoding . . .")
        print("Done! Here is your message!")
        print(decode_image(src))

    elif choice.lower() == 'q':
        print("Goodbye!")
        break
    else:
        print("Invalid input. Please enter one of the above options.")
