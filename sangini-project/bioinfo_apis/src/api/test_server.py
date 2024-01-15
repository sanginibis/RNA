import datetime

class TestServer:
    def get_current_datetime(self):
        """Returns the current system date and time as a formatted string."""
        now = datetime.datetime.now()
        formatted_datetime = now.strftime("%d-%b-%Y %H:%M:%S")
        return formatted_datetime
