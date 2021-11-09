from hcapbypass import bypass
import sys

captcha_solved = bypass(sys.argv[1], 'google.com', True)
#captcha_solved = bypass('fdcf703c-039c-4d3b-b9b0-dd215c728d5a', 'trxking.site', sys.argv[1], True)
print(captcha_solved)