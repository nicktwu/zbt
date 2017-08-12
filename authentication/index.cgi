#!/usr/bin/python

from wsgiref.handlers import CGIHandler
from certificate.app import app

CGIHandler().run(app)