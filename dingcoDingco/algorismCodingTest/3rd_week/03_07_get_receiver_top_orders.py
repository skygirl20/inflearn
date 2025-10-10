# Q. 수평 직선에 탑 N대를 세웠습니다. 모든 탑의 꼭대기에는 신호를 송/수신하는 장치를 설치했습니다.
# 발사한 신호는 신호를 보낸 탑보다 높은 탑에서만 수신합니다. 또한 ,한 번 수신된 신호는 다른 탑으로 송신되지 않습니다.
#
# 예를 들어 높이가 6, 9, 5, 7, 4 인 다섯 탑이 왼쪽으로 동시에 레이저 신호를 발사합니다.
# 그러면, 탑은 다음과 같이 신호를 주고 받습니다.
#
# 높이가 4인 다섯 번째 탑에서 발사한 신호는 높이가 7인 네 번째 탑에서 수신하고,
# 높이가 7인 네 번째 탑의 신호는 높이가 9인 두 번째 탑이,
# 높이가 5인 세 번째 탑의 신호도 높이가 9인 두 번째 탑이 수신합니다.
#
# 높이가 9인 두 번째 탑과 높이가 6인 첫 번째 탑이 보낸 레이저 신호는
# 어떤 탑에서도 수신할 수 없습니다.
#
# 이 때, 맨 왼쪽부터 순서대로 탑의 높이를 담은 배열 heights가 매개변수로 주어질 때 각 탑이 쏜 신호를 어느 탑에서 받았는지
# 기록한 배열을 반환하시오. 만약 신호를 수신하는 탑이 없으면 0으로 표시합니다.

top_heights = [6, 9, 5, 7, 4]

# 숏코딩
# n,*a=map(int,open(0).read().split());s=[];r=[]
# for i,x in enumerate(a):
#  while s and s[-1][1]<x:s.pop()
#  r+= [s[-1][0]+1 if s else 0];s+=[(i,x)]
# print(*r)


# 2번째 값이 1번째보다 크다면? - 0
# 2번째 값이 1번째보다 작다면 - 1
# if heights[1] > heights[0]:
#     result.append(0)
# else:
#     result.append(1)

# 2번째가 1번째보다 큼     -> 3번째가 2번째보다 크다 -> 0
#                       -> 3번째가 2번째보다 작다 -> 2
# 2번째가 1번째보다 작을때  -> 3번째가 2번째보다 크다 -> 1
#                       -> 3번째가 2번째보다 작다 -> 2
#
# 3번째가 2번째보다 작다면 무조건 2
# 3번째가 2번째보다 크다면 1번째랑 비교해서 큰지 따져서 크다면 0 작다면 그 큰 값

# N번째라고 한다면?
# N번째 값이 N-1번째보다 작다면 N-1 ; 이때 N은 최소 2번째부터!(배열이라면 [1] 부터)
# N번째 값이 N-1번째보다 크다면 그 앞을 쫙 비교해서 전부 N이 크면 0 N보다 큰 값이 있다면 그 값
# me -> 시간 초과!
# def get_receiver_top_orders(heights):
#     result = []
#     for index in range(0, len(heights)):
#         if index == 0:
#             result.append(0)
#             continue
#         if heights[index] < heights[index-1]:
#             result.append(index)
#         else:
#             if heights[index] > heights[index-1]:
#                 if index != 1:
#                     sub_index = index
#                     for compare_idx  in range(sub_index - 1, -1, -1):
#                         if heights[compare_idx] > heights[sub_index]:
#                             result.append(compare_idx + 1)
#                             break
#                     else:
#                         result.append(0)
#                 else:
#                     result.append(0)
#                 continue
#             else:
#                 result.append(heights[index-1])
#     return result

def get_receiver_top_orders(heights):
    answer =  [0] * len(heights)

    for i in range(len(heights) - 1, 0, -1):
        for j in range(i - 1, -1, -1):
            if heights[i] <= heights[j]:
                answer[i] = j + 1
                break

    return answer


print(get_receiver_top_orders(top_heights))  # [0, 0, 2, 2, 4] 가 반환되어야 한다!

print("정답 = [0, 0, 2, 2, 4] / 현재 풀이 값 = ",get_receiver_top_orders([6,9,5,7,4]))
print("정답 = [0, 0, 0, 3, 3, 3, 6] / 현재 풀이 값 = ",get_receiver_top_orders([3,8,9,3,5,7,2]))
# print("정답 = [0, 0, 0, 3, 3, 3, 6] / 현재 풀이 값 = ",get_receiver_top_orders([3,9,9,3,5,7,2]))
print("정답 = [0, 0, 2, 0, 0, 5, 6] / 현재 풀이 값 = ",get_receiver_top_orders([1,5,3,6,7,6,5]))

