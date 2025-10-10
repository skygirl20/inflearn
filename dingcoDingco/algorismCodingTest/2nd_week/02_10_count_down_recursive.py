def count_down(number):
    if number < 0:
        return
    
    print(number)
    count_down(number - 1)


count_down(60)