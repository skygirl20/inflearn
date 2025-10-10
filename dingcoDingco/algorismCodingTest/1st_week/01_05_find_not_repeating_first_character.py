# Q. 다음과 같이 영어로 되어 있는 문자열이 있을 때,
# 이 문자열에서 반복되지 않는 첫번째 문자를 반환하시오.
# 만약 그런 문자가 없다면 _ 를 반환하시오.
# "abadabac" # 반복되지 않는 문자는 d, c 가 있지만 "첫번째" 문자니까 d를 반환해주면 됩니다!

input = "abadabac"

def find_not_repeating_first_character(string):
    # fail
    # first = string[0]
    # firstCnt = 0
    # secondCnt = 0
    # if first != string[1]:
    #     second = string[1]
    # for number in string:
    #     if first == number:
    #         firstCnt += 1
    #
    #     if second == number:
    #         secondCnt += 1
    #
    # print(firstCnt, secondCnt)
    # return "_"

    # success
    # for ch in string:
    #     if string.count(ch) == 1:
    #         return ch
    # return "_"


    # solution
    # 총 시간복잡도 - O(N)
    # 반복되지 않는 첫번쩨 알파벳
    # 반복되는지 아닌지를 판단해야 함
    # alphabet_occurence_array
    # String에서 알파벳의 빈도수를 찾는다.
    # O(N)
    occurrence_array = find_alphabet_occurence_array(string)
    # 그리고 빈도수가 1인 알파벳들 중에서 String에서 뭐가 먼저 나왔는지 찾기.
    not_repeating_character_array = []
    # O(1)
    for index in range(len(occurrence_array)):
        alphabet_occurence = occurrence_array[index]
        if alphabet_occurence == 1:
            not_repeating_character_array.append(chr(index + ord('a')))

    # O(N)
    for char in string:
        if char in not_repeating_character_array:
            return char
    return "-"

def find_alphabet_occurence_array(string):
    alphabet_occurence_array = [0] * 26

    for char in string:
        if not char.isalpha():
            continue
        arr_index = ord(char) - ord('a')
        alphabet_occurence_array[arr_index] += 1

    return alphabet_occurence_array

result = find_not_repeating_first_character
print("정답 = d 현재 풀이 값 =", result("abadabac"))
print("정답 = c 현재 풀이 값 =", result("aabbcddd"))
print("정답 =_ 현재 풀이 값 =", result("aaaaaaaa"))