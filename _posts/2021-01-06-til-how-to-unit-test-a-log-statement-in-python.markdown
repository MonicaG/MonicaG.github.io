---
title: TIL&#x3a; Python has an assertLogs function for unit testing log statements
layout: post
category: python
desc: How to use the Python assertLogs function to unit test log statements
---

Today I learned how to unit test log statements with Python. I updated [@bcdevexbot](https://twitter.com/bcdevexbot) to check the status of an opportunity. The bot logs an error message if it encounters an unknown status. To test this scenario I used the [assertLogs](https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertLogs) function. 

The `assertsLogs(logger=None, level=None)` tests that at least one statement is logged at the given level. The test fails if no statements are logged at that level. If statements were logged then the function returns an object containing them.

Below is a very simple example of using the `assertsLogs` function.  The `logging_example.py` file contains the code to test. The `check_status(status)` function is a contrived example that performs some logging.


#### **`logging_example.py`**
```python
import logging

logger = logging.getLogger('demo_logger')
logging.basicConfig(level=logging.DEBUG)


def check_status(status):
    if status == "Open":
        logger.debug("Good status")
    else:
        logger.error("Unknown status: {0}".format(status))


if __name__ == '__main__':
    check_status("Open")
```

The `test_logging_example.py` file contains the unit test.  The `assertsLogs(logger=None, level=None)` takes two optional parameters. 

The first parameter is the name of the logger.  It defaults to the root logger if one is not provided. In the example below, the logger used in the `logging_example.py` file is used.

The second parameter is the log level. It defaults to INFO if a level is not provided. A different level can be specified as in the example below.

#### **`test_logging_example.py`**

```python
import unittest
import logging_example


class MyTestCase(unittest.TestCase):
    def test_logging(self):
        with self.assertLogs('demo_logger', level='DEBUG') as lc:
            logging_example.check_status('Open')
            self.assertEqual(['DEBUG:demo_logger:Good status'], lc.output)
            logging_example.check_status('Bad')
            self.assertEqual(['DEBUG:demo_logger:Good status','ERROR:demo_logger:Unknown status: Bad'], lc.output)


if __name__ == '__main__':
    unittest.main()
```


To learn more see the [Python Documentation](https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertLogs).
