# Q. 다음과 같은 숫자로 이루어진 배열이 있을 때, 이 배열 내에 특정 숫자가 존재한다면 True,
#    존재하지 않다면 False 를 반환하시오.

def is_number_exist(number, array):
    # 이 부분을 채워보세요!
    # me1
    # if number in array:
    #    return True
    # return False
    # me2
    # find_number = number
    # for number in array:
    #     if number == find_number:
    #         return True
    # return False

    # s1
    for element in array:       # array 의 길이만큼 아래 연산이 실행
        if number == element:   # 비교 연산 1번 실행
            return True         # 시간복잡도는 N만큼 걸린다.
    return False


result = is_number_exist
print("정답 = True 현재 풀이 값 =", result(3, [3,5,6,1,2,4])) # 운이 좋은 경우! - 시간복잡도가 1밖에 안걸림
# -> 최선의 경우에는 1만큼의 연산만 필요하다.

print("정답 = False 현재 풀이 값 =", result(7, [6,6,6,7])) # 운이 좋지 않은 경우
# -> 이 경우에는 배열의 끝까지 찾아야 하기에 시간복잡도가 N만큼 걸린다.

print("정답 = True 현재 풀이 값 =", result(2, [6,9,2,7,1888]))