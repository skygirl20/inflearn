# Q.  다음과 같은 문자열을 입력받았을 때, 어떤 알파벳이 가장 많이 포함되어 있는지 반환하시오.
# (단 최빈값을 가진 알파벳이 여러개일 경우 알파벳 순서가 가장 앞에 위치한 알파벳을 출력하시오)

# 1번째 방법
# 각 알파벳마다 문자열을 돌면서 몇 글자 나왔는지 확인합니다.
# 만약 그 숫자가 저장한 알파벳 빈도 수보다 크다면, 그 값을 저장하고 제일 큰 알파벳으로 저장합니다.
# 이 과정을 반복하다보면 가장 많이 나왔던 알파벳을 알 수 있습니다.

# def find_max_occurred_alphabet(string):
#     alphabet_array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
#                       "t", "u", "v", "x", "y", "z"]
#     max_occurrence = 0
#     max_alphabet = alphabet_array[0]
#
#     for alphabet in alphabet_array:
#         occurrence = 0
#         for char in string:
#             if char == alphabet:
#                 occurrence += 1
#
#         if occurrence > max_occurrence:
#             max_alphabet = alphabet
#             max_occurrence = occurrence
#
#     return max_alphabet
#
# print("정답 = i 현재 풀이 값 =", find_max_occurred_alphabet("hello my name is dingcodingco"))
# print("정답 = e 현재 풀이 값 =", find_max_occurred_alphabet("we love algorithm"))
# print("정답 = b 현재 풀이 값 =", find_max_occurred_alphabet("best of best youtube"))

# 2번재 방법
# 각 알파벳의 빈도수를 alphabet_occurrence_list 라는 변수에 저장합니다.
# 그리고 각 문자열을 돌면서 해당 문자가 알파벳인지 확인하고, 알파벳을 인덱스 화 시켜 각 알파벳의 빈도수를 업데이트 합니다.
#
# 이후, 알파벳의 빈도수가 가장 높은 인덱스를 찾습니다.

def find_max_occurred_alphabet(string):
    alphabet_occurrence_array = [0] * 26

    for char in string:
        if not char.isalpha():
            continue
        arr_index = ord(char) - ord('a')
        alphabet_occurrence_array[arr_index] += 1

    max_occurrence = 0
    max_alphabet_index = 0
    for index in range(len(alphabet_occurrence_array)):
        alphabet_occurrence = alphabet_occurrence_array[index]
        if alphabet_occurrence > max_occurrence:
            max_occurrence = alphabet_occurrence
            max_alphabet_index = index